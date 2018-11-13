import * as React from 'react'
import './index.less'
import * as testImg from './img/cry.jpg'
export default class Test extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div className='test'>
                testw
                <div>
                    <span>图片引入测试</span><br />
                    <img src={testImg} alt='cry' title='cry' />
                </div>

            </div>
        )
    }
}