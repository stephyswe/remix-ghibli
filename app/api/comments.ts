export type CommentEntry = {
  id: number;
  name: string;
  message: string;
  filmId: string;
};

export async function getComments(filmId?: string | null) {
  const response = await fetch(`http://localhost:3001/comments?filmId=${filmId}`);

  return response.json();
}

export async function addComments(comment: CommentEntry) {
  const response = await fetch('http://localhost:3001/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}
