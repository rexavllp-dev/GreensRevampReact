const isEmailValid = (email) => {
  if (email === '') return false;
  // if (!email?.length) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { isEmailValid };
