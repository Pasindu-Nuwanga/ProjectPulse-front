import "./CompletedTasksStyles.css";

function CompletedTask(props){
    return(
        <div className="task-card">
        <div className="task-image">
            <img src={props.image} alt="Image"/>
        </div>
        <h4>{props.heading}</h4>
        <p>{props.body}</p>
       </div>
    )
}

export default CompletedTask;