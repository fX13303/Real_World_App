import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'

function Tags({tag}) {
    return(
        <Link to="" className="tag-pill tag-default">
            {tag}
        </Link>
    )
}

export default Tags