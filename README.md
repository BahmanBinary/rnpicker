# RNPicker



## Preface

Hello friends!
For a while I was looking for a good, customizable Picker for react native but most of these pickers have little flexibility. For example you can't support RTL correctly or use custom component for each picker items.



![](./assets/img/RNPicker.gif)



## Documentation

##### Installation

```
npm install @bahmanbinary/rnpicker
```

```
yarn add @bahmanbinary/rnpicker
```



##### APIs

###### Props

|       Prop       |                             Type                             |     Default     |                      Description                      |
| :--------------: | :----------------------------------------------------------: | :-------------: | :---------------------------------------------------: |
|       data       | {label: string \| number, value: string \| number, selected?:boolean}[] |       []        |                  Data for each item                   |
|       rtl        |                           boolean                            |      false      |             Enable right to left support              |
|  itemComponent   |                    React Native Component                    |                 |            Wrapper component for each item            |
|    itemStyle     |                              {}                              |        -        |      Custom style applied to each itemComponent       |
|  iconComponent   | React Native Component (props: { iconColor:string, iconSize:number, iconStyle:{} ,...props:any }) |                 |                    Icon component                     |
|     onSelect     |       ( item:string \| number, index:number ) => void        |        -        | Function that will be executed for each item selected |
|  containerStyle  |                              {}                              |        -        |            RNPicker container custom style            |
|   placeholder    |                            string                            | 'Please select' |                      Placeholder                      |
| placeholderStyle |                              {}                              |        -        |           RNPicker placeholder custom style           |
|    iconColor     |                            string                            |     'black'     |       Icon color applied to each iconComponent        |
|     iconSize     |                            number                            |                 |        Icon size applied to each iconComponent        |
|    iconStyle     |                              {}                              |        -        |      Custom style applied to each iconComponent       |

###### Methods

|    Method     |    Type    |      Description      |
| :-----------: | :--------: | :-------------------: |
| dismissPicker | () => void | Dismiss opened picker |



##### Usage

```javascript
import React,{Component} from 'react';
import RNPicker from '@bahmanbinary/rnpicker';

export default class Example extends Component{
    render(){
return <RNPicker data=[
	{label:'item 1', value:1},
    {label:'item 2', value:2},
    {label:'item 3', value:3, selected:true},
    {label:'item 4', value:4},
    {label:'item 5', value:5}
]        
        />
    }
}
```



*If this project was useful to you, give it a* **Star** *!* ⭐😎😉