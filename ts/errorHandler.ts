import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface errorResult {
    title: string,
    text: string,
    icon: iconType,
    confirmButtonText: string
}

type iconType = "success" | "error" | "warning" | "info" | "question"

export default function ErrorHandler(result: errorResult) {

    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: result.title,
        text: result.text,
        icon: result.icon,
        confirmButtonText: result.confirmButtonText
    })
}

export function swalTost(title: string,icon: iconType = "success") {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: title
    })
}