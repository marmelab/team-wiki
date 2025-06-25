import { useParams } from "react-router";
import { Empty, List, useGetOne } from "react-admin";
import { useDefineAppLocation } from "@react-admin/ra-navigation";

import { MessagesList } from "./MessagesList.tsx";
import { NewMessageForm } from "./NewMessageForm.tsx";

export const PageMessagesList = () => {
  const { id: pageId } = useParams();

  const { data: page } = useGetOne("pages", { id: pageId });
  const { data: category } = useGetOne("categories", { id: page?.category_id });
  useDefineAppLocation(
    (category?.parent_id ? "nested." : "") + "category.page.discussions",
    { page, category },
  );

  return (
    <List
      title="Discussions"
      resource="pages_messages"
      filter={{ page_id: pageId }}
      sort={{
        field: "date",
        order: "DESC",
      }}
      empty={<EmptyMessagesList />}
      sx={{
        ["& .RaList-content"]: {
          border: "none",
          background: "none",
          boxShadow: "0 0 0 0 transparent",
        },
      }}
    >
      <MessagesList />
    </List>
  );
};

export const EmptyMessagesList = () => {
  return (
    <>
      <NewMessageForm title="Start discussion" />
      <Empty resource={"messages"} />
    </>
  );
};
