import React, { useState } from 'react'
import { Delete, Edit, Forum, GroupAdd } from '@material-ui/icons'
import {
  IconButton,
  MenuList,
  MenuItem,
  List,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Popover,
  Avatar,
  Container
} from '@mui/material'
import { AttachFile, LocalPhone, PhotoCamera, Send } from '@material-ui/icons'
import { useHarmonyStyles } from './style'
import { styled } from '@mui/material/styles'
import { ChatService } from '@xrengine/client-core/src/social/services/ChatService'
import { useChatState } from '@xrengine/client-core/src/social/services/ChatService'
import { useAuthState } from '@xrengine/client-core/src/user/services/AuthService'
import { Message } from '@xrengine/common/src/interfaces/Message'

const Input = styled('input')({
  display: 'none'
})

const MessageBox: React.FunctionComponent = () => {
  const [composingMessage, setComposingMessage] = useState('')

  const chatState = useChatState()
  const selfUser = useAuthState().user.value
  const channelState = chatState.channels
  const channels = channelState.channels.value
  const channelEntries = Object.values(channels).filter((channel) => !!channel)!
  const targetChannelId = chatState.targetChannelId.value
  const [anchorEl, setAnchorEl] = React.useState(null)
  const activeChannel = channels.find((c) => c.id === targetChannelId)!

  const composingMessageChangedHandler = (event: any): void => {
    const message = event.target.value
    setComposingMessage(message)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const classes = useHarmonyStyles()

  const packageMessage = (): void => {
    if (composingMessage.length > 0) {
      ChatService.createMessage({
        text: composingMessage
      })
      setComposingMessage('')
    }
  }

  React.useEffect(() => {
    if (channelState.updateNeeded.value === true) {
      ChatService.getChannels()
    }
  }, [channelState.updateNeeded.value])

  React.useEffect(() => {
    channelEntries.forEach((channel) => {
      if (channel?.updateNeeded != null && channel?.updateNeeded === true) {
        ChatService.getChannelMessages(channel.id)
      }
    })
  }, [channels])

  let sortedMessages
  if (activeChannel != null && activeChannel.messages) {
    sortedMessages = [...activeChannel.messages].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  }
  return (
    <>
      <div className={`${classes.dFlex} ${classes.justifyContentBetween} ${classes.p2}`}>
        <h2>{selfUser?.name}</h2>
        <LocalPhone fontSize="small" />
      </div>
      <Container>
        <div className={`${classes.dFlex} ${classes.flexColumn} ${classes.justifyContentBetween} ${classes.h100}`}>
          <div className={classes.scroll}>
            {sortedMessages?.map((message: Message, index: number) => {
              return (
                <div key={message.id} className={`${classes.dFlex} ${classes.flexColumn}`}>
                  {message.senderId !== selfUser.id && (
                    <div className={`${classes.selfStart} ${classes.my1}`}>
                      <div className={classes.dFlex}>
                        {index !== 0 && message.senderId !== sortedMessages[index - 1].senderId && (
                          <Avatar src={message.sender?.avatarUrl} />
                        )}
                        {index === 0 && <Avatar src={message.sender?.avatarUrl} />}
                        <div className={`${classes.bgBlack} ${classes.mx2}`} onClick={(e) => handleClick(e)}>
                          <p>{message.text}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {message.senderId === selfUser.id && (
                    <div className={`${classes.selfEnd} ${classes.my1}`}>
                      <div className={classes.dFlex}>
                        <div className={`${classes.bgInfo} ${classes.mx2}`} onClick={(e) => handleClick(e)}>
                          <p>{message.text}</p>
                        </div>
                        {index !== 0 && message.senderId !== sortedMessages[index - 1].senderId && (
                          <Avatar src={message.sender?.avatarUrl} />
                        )}
                        {index === 0 && <Avatar src={message.sender?.avatarUrl} />}
                      </div>
                    </div>
                  )}
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left'
                    }}
                  >
                    <div className={classes.bgDarkLight}>
                      <MenuList sx={{ width: 210, maxWidth: '100%', borderRadius: 10 }}>
                        <MenuItem className={classes.my2}>
                          <ListItemIcon>
                            <Edit fontSize="small" className={classes.muted} />
                          </ListItemIcon>
                          <ListItemText>EDIT</ListItemText>
                        </MenuItem>
                        <MenuItem className={classes.my2}>
                          <ListItemIcon>
                            <Delete fontSize="small" className={classes.danger} />
                          </ListItemIcon>
                          <ListItemText>DELETE</ListItemText>
                        </MenuItem>
                      </MenuList>
                    </div>
                  </Popover>
                </div>
              )
            })}
          </div>
          <div className={`${classes.dFlex} ${classes.justifyContentBetween} ${classes.alignCenter}`}>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton aria-label="upload picture" component="span">
                <AttachFile className={classes.white} />
              </IconButton>
            </label>
            <div className={classes.flexGrow}>
              <div className={`${classes.dFlex} ${classes.alignCenter}`}>
                <Avatar src={selfUser.avatarUrl} />
                <textarea
                  className={`${classes.formControl} ${classes.inPad}`}
                  placeholder="Your message"
                  value={composingMessage}
                  onKeyPress={(e) => {
                    if (e.shiftKey === false && e.charCode === 13) {
                      e.preventDefault()
                      packageMessage()
                    }
                  }}
                  onChange={composingMessageChangedHandler}
                ></textarea>
              </div>
            </div>
            <IconButton onClick={packageMessage} component="span">
              <Send className={classes.white} />
            </IconButton>
          </div>
        </div>
      </Container>
    </>
  )
}

export default MessageBox
