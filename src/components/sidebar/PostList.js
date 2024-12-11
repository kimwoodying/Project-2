import { pushUrl } from "../../utills/api.js";

export default function PostList({
  $target,
  initialState,
  onAttach,
  onDelete,
}) {
  const $postList = document.createElement("div");
  $postList.className = "postList";
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.createTreeView = (data) => {
    let str = "";
    for (const key in data) {
      if (data[key].documents.length > 0) {
        str += `<li class="dataList">📄 ${data[key].title}
                    <button class="addBtn">➕</button>
                    <button class="delBtn">🗑️</button>
                    <ul>${this.createTreeView(data[key].documents)}</ul>
                </li>`;
      } else {
        str += `<li class="dataList">📄 ${data[key].title}
                    <button class="addBtn">➕</button>
                    <button class="delBtn">🗑️</button>
                </li>`;
      }
    }
    return str;
  };
  this.render = () => {
    $postList.innerHTML = `<ul>
    ${this.state
      .map(
        (document) =>
          `<li class="dataList">📄 ${document.title}
                    <button class="addBtn">➕</button>
                    <button class="delBtn">🗑️</button>
                </li>
                ${
                  document.documents.length > 0
                    ? `<ul>${this.createTreeView(document.documents)}</ul>`
                    : ""
                }
                `
      )
      .join("")}
}
</ul>
`;
  };
  this.render();
  $postList.addEventListener("click", (e) => {
    const className = e.target.className;
    const id = e.target.dataset.id;
    const $li = e.target.closest("li");
    if (className === "addBtn") {
      onAttach(id);
    } else if (className === "delBtn") {
      onDelete(id);
    } else if (className === "dataList") {
      if ($li) {
        const id = $li.dataset.id;
        pushUrl(`/documents/${id}`);
      }
    }
  });
}