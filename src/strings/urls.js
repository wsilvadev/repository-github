const Urls = {
  empty:
    'https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png',
  trash:
    'https://cdn.icon-icons.com/icons2/1572/PNG/512/3592821-garbage-can-general-office-recycle-bin-rubbish-bin-trash-bin-trash-can_107760.png',
  avatarHome: id => `https://avatars3.githubusercontent.com/u/${id}?v=4`,
  back:
    'https://cdn.icon-icons.com/icons2/731/PNG/512/right-arrow-1_icon-icons.com_62892.png',
  issues: (orgsRepos, page, state) =>
    `https://api.github.com/repos/${orgsRepos}/issues?page=${page}&state=${state}`,
  user: (orgsRepos, page) => `https://github.com/${orgsRepos}/issues/${page}`,
  avatarIssue: id => `https://avatars3.githubusercontent.com/u/${id}?v=4`,
  union:
    'https://cdn.icon-icons.com/icons2/731/PNG/512/right-arrow-1_icon-icons.com_62892.png',
};

export default Urls;
