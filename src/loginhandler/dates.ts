export interface IDATES {
  expires: string;
  username: string;
}

export const DATES: IDATES[] = [
  {
    expires: 'Jan 20 3210',
    username: 'anders',
  },
  {
    expires: 'Jun 9 3210',
    username: 'jeSper',
  },
];

// (() => {
//   fetch('/ulog/dates.json')
//     .then((resp) => {
//       console.log('resp', resp);
//       return resp.json();
//     })
//     .then((rj) => {
//       console.log('rj', rj);
//     });
// })();
