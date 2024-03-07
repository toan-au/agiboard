import NewBoardButton from "./NewBoardButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { createBoardAsync, getBoardsAsync } from "../../state/boards/boards";
import BoardListItem from "./BoardListItem";

function Boards() {
  const { userBoards } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);

  function handleSave(value: string) {
    dispatch(createBoardAsync(value));
  }

  return (
    <div className="pt-7">
      <h1 className="text-4xl my-5">Your boards</h1>
      <ul className="flex flex-row flex-wrap gap-5 mb-5">
        {userBoards.map((board) => (
          <BoardListItem key={board._id} board={board}></BoardListItem>
        ))}
        <li>
          <NewBoardButton
            placeholder="Enter a board name"
            onSave={handleSave}
          ></NewBoardButton>
        </li>
      </ul>
    </div>
  );
}

export default Boards;
