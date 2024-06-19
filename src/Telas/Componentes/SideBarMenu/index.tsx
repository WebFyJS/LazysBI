import style from './index.module.css';

export default function SideBarMenu() {

    const mock = [
        {
            title: 'title',
            address: 'ijoiojno-piop-pnopo0kopn',
            id: 'lokmomkokpomkkpmkkpml'
        },
        {
            title: 'rel de alguma coisa',
            address: 'ijoiojno-piop-pnopo0kopn',
            id: 'lokmomkokpomkkpmkkpml'
        },
        {
            title: 'abc de escol',
            address: 'ijoiojno-piop-pnopo0kopn',
            id: 'lokmomkokpomkkpmkkpml'
        },
        {
            title: 'title4',
            address: 'ijoiojno-piop-pnopo0kopn',
            id: 'lokmomkokpomkkpmkkpml'
        },
        {
            title: 'title',
            address: 'ijoiojno-piop-pnopo0kopn',
            id: 'lokmomkokpomkkpmkkpml'
        },
        {
            title: 'title',
            address: 'ijoiojno-piop-pnopo0kopn',
            id: 'lokmomkokpomkkpmkkpml'
        },
        {
            title: 'title',
            address: 'ijoiojno-piop-pnopo0kopn',
            id: 'lokmomkokpomkkpmkkpml'
        },
    ]

    return (
        <aside className={style.main}>
            <button onClick={() => console.log('add new panel')}>
                Adicionar novo painél
            </button>
            <hr />
            <div className={style.panels_container}>
                {
                    mock.map((e) => {
                        return (
                            <button>
                                {e.title}
                            </button>
                        )
                    })
                }
            </div>
        </aside>
    )
}