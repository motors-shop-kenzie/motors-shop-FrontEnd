import UserHeader from "../UserHeader";
import styles from "./styles.module.scss";

const CommentCard = () => {
    return(
        <div className={styles.container}>
            <UserHeader/>
            <div className={styles.text}>
            Lorem ipsum venenatis scelerisque malesuada netus hac, senectus vivamus porta neque imperdiet, leo ornare purus metus egestas. aenean nullam fames vulputate netus in tortor rutrum amet mi habitant, varius nisi bibendum dapibus auctor et velit fusce porta. scelerisque convallis fermentum et elit aenean cursus euismod maecenas, odio porttitor sociosqu dictum eros egestas commodo molestie lorem, ut est mauris potenti felis risus posuere.
            </div>
        </div>
    )
}

export default CommentCard