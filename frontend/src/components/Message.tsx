const Message = (props: any) => {

  //TODO remove the any from props
  return (
    <section>
      <div className="vote"> {props.voteCount} </div>
      <div className="content">
        <div className="content-header">{props.userName}</div>
        <div className="message">{props.message}</div>
      </div>
    </section>
  )
}

export default Message