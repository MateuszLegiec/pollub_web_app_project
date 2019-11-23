import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleUp, faAngleUp, faMinus} from "@fortawesome/fontawesome-free-solid";
import React from "react";

export const priorityIcon = (priority) => {
    if (priority === 3){
        return <span><FontAwesomeIcon className="text-danger mr-2 pt-1 ml-2" icon={faAngleDoubleUp}/>High</span>
    }else if(priority === 2){
        return <span><FontAwesomeIcon className="text-warning mr-2 pt-1 ml-2" icon={faAngleUp}/>Medium</span>
    }else if (priority === 1){
        return <span><FontAwesomeIcon className="text-success mr-2 pt-1 ml-2" icon={faMinus}/>Low</span>
    }
};