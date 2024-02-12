/**
 * Most of ED's API endpoints requires a `application/x-www-form-urlencoded`
 * content-type that is always encoded in the following: `data={...content}`.
 */
const encoder = <T extends unknown>(body: T): string => {
  return `data=${JSON.stringify(body)}`;
};

export default encoder;
