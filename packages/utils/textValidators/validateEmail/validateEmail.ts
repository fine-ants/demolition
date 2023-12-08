// A function that validates email format.
export default function validateEmail(
  email: string,
  options?: { regExp?: RegExp; errorMessage?: string }
) {
  const { regExp, errorMessage } = options ?? {};

  const emailRegex =
    regExp ??
    new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!emailRegex.test(email)) {
    throw Error(errorMessage ?? "Invalid Email");
  }
}
