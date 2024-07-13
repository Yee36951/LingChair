import { showErrorImage } from '../utils.js'

let Main = (
    <div id="app-inner" style={{
        position: 'relative',
        'font-family': '-apple-system, system-ui, -webkit-system-font'
    }}>
        <mdui-navigation-rail contained style={{
            height: '100%'
        }}>
            <mdui-button-icon icon="menu" slot="top" onClick={function() {
                let i = $('mdui-navigation-drawer').get(0)
                i.open = !i.open
            }}></mdui-button-icon>

            <mdui-navigation-rail-item icon="watch_later--outlined"></mdui-navigation-rail-item>
            <mdui-navigation-rail-item icon="contacts"></mdui-navigation-rail-item>
            <mdui-navigation-rail-item icon="group"></mdui-navigation-rail-item>

            <mdui-button-icon icon="settings" slot="bottom"></mdui-button-icon>
        </mdui-navigation-rail>

        <mdui-layout>
            <mdui-navigation-drawer class="drawer" close-on-overlay-click>
                <mdui-list style={{
                    width: '22%'
                }}>
                    <mdui-list-item alignment="center" description="Text">
                        Title
                        <mdui-avatar slot="icon" src="" onerror="showErrorImage('res/default_avatar.png', '默认头像')"></mdui-avatar>
                    </mdui-list-item>
                </mdui-list>
            </mdui-navigation-drawer>

        </mdui-layout>


        <div style={{
            height: '100%',
            overflow: 'auto'
        }}>

        </div>
    </div>
)

export default Main
