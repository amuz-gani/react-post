import { atom } from "recoil";

export const commentListAtom = atom({
  key: "commentListAtom",
  default: [],
});

export const userListAtom = atom({
  key: "userListAtom",
  default: [],
});

export const postListAtom = atom({
  key: "postListAtom",
  default: [],
});
