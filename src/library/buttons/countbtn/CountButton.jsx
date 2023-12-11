import './CountButton.scss'


export default function CountButton() {

    return (
        <div className='countbtn'>
            <button>-</button>
            <input type="text" value="01" />
            <button>+</button>
        </div>
    )

}