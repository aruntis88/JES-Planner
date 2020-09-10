import React from "react";
import { API } from "./config";

const ShowImage = ({ item, url }) => (
    <div>
        <img
            src={`${API}/${url}/photo/${item._id}`}
            style={{ maxHeight: "12vh", maxWidth: "10vw" }}
        />
        <i class="close icon" style={{position:"absolute"}}/>
    </div>
);

export default ShowImage;
