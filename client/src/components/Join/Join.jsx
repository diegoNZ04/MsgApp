// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react'
import io from 'socket.io-client'
import style from './Join.module.css'
import {Input, Button} from '@mui/material'

export default function Join({setChatVisibility, setSocket}) {
  
  const usernameRef = useRef()

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if (!username.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }
  
  return (
    <div>
        <div className={style['title-join']}>
        <h2>Mande Um ZapZap</h2>
        </div>
        <div className={style['join-container']}>
        <Input inputRef={usernameRef} placeholder='Nome de Usuário' />
        <Button sx={{mt:2}} onClick={() =>handleSubmit()} >Entrar</Button>
    </div>
    </div>

  )
}
