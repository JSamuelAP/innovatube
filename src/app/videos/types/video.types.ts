export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

export type Favorite = {
  userId: number;
  videoId: string;
};
