import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { deleteBoardAsync, renameBoardAsync } from "../../state/boards/boards";
import { FaPen, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import MoreOptionsButton from "../UI/MoreOptionsButton";
import Submenu from "../UI/submenu/Submenu";
import IconMenuButton from "../UI/submenu/IconMenuButton";

function BoardListItem(props: { board: { _id: string; name: string } }) {
  const { _id, name } = props.board;
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const ref = useDetectClickOutside({ onTriggered: handleOutsideClick });
  const renameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDisplayName(name);
  }, [name]);

  function handleOutsideClick() {
    setShowMenu(false);
    setEditing(false);
  }

  function handleMenuClick() {
    setShowMenu(!showMenu);
  }

  function handleRenameClick(e: MouseEvent) {
    e.stopPropagation();
    setEditing(true);
    setTimeout(() => {
      setShowMenu(false);
      renameRef.current && renameRef.current.focus();
    }, 0);
  }

  function handleRenameSubmit(e: FormEvent, boardId: string) {
    e.preventDefault();
    const payload = {
      boardId,
      name: displayName,
    };
    dispatch(renameBoardAsync(payload));
    setEditing(false);
  }

  function handleDeleteClick(e: MouseEvent, boardId: string) {
    e.stopPropagation();
    dispatch(deleteBoardAsync(boardId));
  }

  function handleBoardClick() {
    navigate(`/board/${_id}`);
  }

  return (
    <li ref={ref} className="board-list-item cursor-pointer">
      <div className="block bg-blue-500 hover:bg-blue-400 w-64 h-32">
        <div className="flex relative h-full">
          <div className="h-full w-full p-2" onClick={handleBoardClick}>
            <h3 className="text-white select-none" hidden={editing}>
              {displayName}
            </h3>
            <form
              hidden={!editing}
              onSubmit={(e) => handleRenameSubmit(e, _id)}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={renameRef}
                type="text"
                className="text-center"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              ></input>
            </form>
          </div>
          <div className="ml-auto p-2">
            <MoreOptionsButton onClick={handleMenuClick} />
          </div>
          {showMenu && (
            <Submenu showMenu={showMenu}>
              <IconMenuButton
                icon={<FaPen />}
                onClick={handleRenameClick}
                text="Rename"
              />
              <IconMenuButton
                icon={<FaTrash />}
                onClick={(e) => handleDeleteClick(e, _id)}
                text="Delete"
              />
            </Submenu>
          )}
        </div>
      </div>
    </li>
  );
}

export default BoardListItem;
