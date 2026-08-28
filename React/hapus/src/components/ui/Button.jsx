export default function Button({children, variant='primary', onClick, type='button'}){

    const base = 'inline-block font-semibold rounded-lg transition-all duration-200 cursor-pointer text-center'

    const styles = {
        primary: 'bg-primary text-white hover:opacity-90 px-6 py-3',
        secondary: 'bg-secondary text-white hover:opacity-90 px-6 py-3',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3'
    }

    return(
        <button type={type} className={`${base} ${styles[variant]}`} onClick={onClick}>
            {children}
        </button>
    )
}