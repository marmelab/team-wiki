import { MdNode } from "@toast-ui/editor";

export function nodeToString(
  node: MdNode,
  appendNext: boolean = false,
): string {
  let text: string = "";

  if (node.type === "text") {
    text = node.literal ?? "";
  } else {
    text = node.firstChild ? nodeToString(node.firstChild, true) : "";
  }

  return text + (appendNext && node.next ? nodeToString(node.next, true) : "");
}
