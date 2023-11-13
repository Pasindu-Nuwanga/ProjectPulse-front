import "./OpenStyles.css";

function Open(props) {
    return (
      <>
      <div className={props.clsName}>
        <img src={props.openImg} alt="Picture"/>
        <div className={props.origin}>
            <h1>{props.title}</h1>
            <h2>{props.text}</h2>
            <h3>{props.project}</h3>
        </div>
      </div>


      </>

    );
  }
  
  export default Open;