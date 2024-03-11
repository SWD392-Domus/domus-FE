import capitalizeFirstLetter from "./capitalizeFirstLetter";

const generateActions = (initialState: any, startWith = "set") => {
  const keys = Object.keys(initialState);

  return keys.reduce((acc, key) => {
    const _key = startWith ? startWith + capitalizeFirstLetter(key) : key;
    return {
      ...acc,
      [_key]: (state: any, action: any) => {
        state[key] = action.payload;
      },
    };
  }, {});
};

export default generateActions;
