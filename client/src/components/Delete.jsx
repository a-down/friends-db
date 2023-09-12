import {useState} from "react";
import { HiOutlineTrash } from 'react-icons/hi'


// Delete component to handle event deletion... duh
export default function DeleteEvent({ event }) {
    const [deleting, setDeleting] = useState(false);
    function handleDelete() {
        try {
            fetch('/comment/' + comment.id, {
                        method: 'DELETE'
                    });
                    setDeleting(true);
                } catch (err) {
                    console.error(err);
                }
            }

            return (
                <div>
                    <button onClick={handleDelete}>
                        <HiOutlineTrash />
                    </button>
                    {deleting && "Deleting..."}
                </div>
            );
}

