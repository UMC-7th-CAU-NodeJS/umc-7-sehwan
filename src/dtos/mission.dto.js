export const bodyToMission = (body) => {
  return {
    store_id : body.store_id,
    name : body.name,
    description : body.description,
    award : body.award,
    award_point : body.award_point,
  };
};
