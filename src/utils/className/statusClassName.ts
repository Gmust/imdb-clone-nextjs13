export const selectClassname = (status: Movie['status']) => {
  let classname = '';

  switch (status) {
    case 'Rumored': {
      return classname = 'border-fuchsia-900 text-fuchsia-900';
    }
    case 'Canceled': {
      return classname = 'border-red-800 text-red-800';
    }
    case 'In Production': {
      return classname = 'border-orange-500 text-orange-500';
    }
    case 'Planned': {
      return classname = 'border-emerald-700 text-emerald-700';
    }
    case 'Post Production': {
      return classname = 'border-cyan-500 text-cyan-500';
    }
    case 'Released': {
      return classname = 'border-green-800 text-green-800';
    }
    default: {
      return classname;
    }
  }
};