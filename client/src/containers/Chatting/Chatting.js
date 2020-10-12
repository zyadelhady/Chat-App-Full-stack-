import React, { useEffect, useState, useContext, useRef } from 'react';
import classes from './Chatting.module.scss';
import pic from '../../assets/jeffrey_000.png';
import { Header } from './Header/Header';
import { ChattingMessages } from './ChattingMessages/ChattingMessages';
import { ChatMessage } from './ChattingMessages/ChatMessage/ChatMessage';
import { ChattingSend } from './ChattingSend/ChattingSend';
import { socket } from '../../socket';
import { Context } from '../../Context';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { useCallback } from 'react';
import uniqid from 'uniqid';
import { Spinner } from '../../components/Spinner/Spinner';

export const Chatting = () => {
  const [typingMessage, setTypingMessage] = useState('');
  const { user } = useContext(Context);
  const [msgs, setMsgs] = useState([]);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const msgRef = useRef(null);

  const msgsRef = useRef(null);

  useEffect(() => {
    msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, otherUserTyping]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('newMessage', (message) => {
      setMsgs((prev) => {
        return [...prev, message];
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });
  }, []);

  useEffect(() => {
    socket.on('UserIsTyping', (name) => {
      setOtherUserTyping(true);
      setTypingMessage(`${name.name} is typing....`);
    });
    socket.on('UserStoppedTyping', () => {
      setOtherUserTyping(false);
    });
  }, [otherUserTyping]);

  useEffect(() => {
    socket.emit('join', { ...user, to: username });
  }, [user, username]);

  const getMsgs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        'api/v1/messages',
        { toUsername: username, fromUsername: user.username },
        {
          withCredentials: true,
        }
      );

      setMsgs(res.data.data.messages);
      setIsLoading(false);
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    } catch (err) {
      console.log(err.response);
      setIsLoading(false);
    }
  }, [user.username, username]);

  useEffect(() => {
    getMsgs();
  }, [getMsgs]);

  const sendMsgHandler = () => {
    const userMessage = msgRef.current.value;
    if (userMessage.trim().length !== 0) {
      socket.emit('createMsg', {
        message: userMessage,
        to: username,
        from: user._id,
        username: user.username,
        createdAt: Date.now(),
      });
      console.log(userMessage);

      setMsgs((prev) => {
        console.log(userMessage);

        return [
          ...prev,
          {
            message: userMessage,
            from: user._id,
            createdAt: Date.now(),
          },
        ];
      });

      // msgRef.current.value = '';

      if (username === 'AdminBot') {
        const botMessages = [
          `welcome to my small chat app 😃 take a look at my github : https://github.com/zyadelhady       
          and you can contact me with my email : zyade40@gmail.com`,
          'hi nice to have you here 🙋',
          'you should see my github : https://github.com/zyadelhady',
          'you can contact me now at zyade40@gmail.com 😉',
          'hello, my name is zyad i made this chat app for any question you can email me at zyade40@gmail.com or see my github : https://github.com/zyadelhady',
          'welcome to my chat app take a good look :)',
        ];

        const botMessage = botMessages[Math.floor(Math.random() * 5 + 1)];

        socket.emit('createMsg', {
          message: botMessage,
          to: user.username,
          from: '5e8c71f6df24a000174af375',
          username: 'AdminBot',
          createdAt: Date.now(),
        });
        setMsgs((prev) => {
          return [
            ...prev,
            {
              message: botMessage,
              from: '5e8c71f6df24a000174af375',
              createdAt: Date.now(),
            },
          ];
        });
      }
    }
  };

  let renderMesgs;

  renderMesgs = msgs.map((e) => {
    return (
      <ChatMessage
        key={uniqid()}
        createdAt={e.createdAt}
        type={e.from === user._id ? 'sent' : 'recevied'}
        msg={e.message}
      />
    );
  });

  return (
    <div className={classes.Chat}>
      <Header photo={pic} name={`${username}`} />
      <ChattingMessages setMsgs={setMsgs} msgs={msgs} msgsRef={msgsRef}>
        {isLoading ? <Spinner /> : renderMesgs}
        {otherUserTyping ? (
          <ChatMessage
            key={uniqid()}
            createdAt={new Date(Date.now())}
            type={'typing'}
            msg={typingMessage}
          />
        ) : null}
      </ChattingMessages>
      <ChattingSend sendMsgHandler={sendMsgHandler} msgRef={msgRef} />
    </div>
  );
};
