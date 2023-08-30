import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "../../Context/ListboxWrapper"

function OptionListbox() {
  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Actions"
        onAction={(key) => alert(key)}
      >
        <ListboxItem key="new">New file</ListboxItem>
        <ListboxItem key="copy">Copy link</ListboxItem>
        <ListboxItem key="edit">Edit file</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
          Delete file
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export default  OptionListbox;
