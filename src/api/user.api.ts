export const get = async () => {
  let response;
  try {
    response = await fetch('/api/v1/users/me');
    const jsonData = await response.json();
    return jsonData.data;
  } catch (e) {
    return;
  }
};

export default {
  get,
};
