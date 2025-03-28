import { LoginForm } from "./loginform"

export const Login = () => {
    return (
        <div className="flex flex-col-reverse sm:flex-row w-full h-[100%] sm:p-0 p-4 overflow-y-auto">
            <LoginForm className="w-full sm:w-[50vw] sm:m-auto sm:justify-items-center p-4 sm:p-0"></LoginForm>
            <img className="sm:w-[50vw] max-h-[30vh] sm:max-h-full object-cover rounded-lg m-2 sm:m-4" src="https://s3-alpha-sig.figma.com/img/992d/fb28/30a38887b0559dfb619dc9eba940a887?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gUP6R~fI5oq64jCi3suhU-xiFjUD3TpbfOaaslO3UkOv6FNhyL94nnUEJqv7Qti3ea-RXIDvOJQA63u-0UBGHMK22y8ZJwf5b0hfjoUIpPEpaMLMDO8MThZ88h~0fcDdQxXg5syUY3ZKM25h0fPNLmeBJ2XbzxITTzQ-d7uwK9o~9KFjj9x21YMgn5qkWhtUxWZwARbzXkRbZ0Wr43CHNgvSazFjdJ5KGg1rcT6wO-bX0uIUMMXIS~~AtGo64Yr3XJWJLhMMZAcx~D8TrBg4Suq-w1j5xeahoVWkhXam9s2hKEjbHhhz9vmA8-6hYbzAQ03oK-51zxHH3cLg8rBzRQ__" alt="imagen de flores" />
        </div>
    )
}