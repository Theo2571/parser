import React, {useState} from 'react';
import axios from "axios";
import cheerio from "cheerio";


const App = () => {
    const [value, setValue] = useState('')
    console.log(value)


    const changeHandler = (e) => {
        setValue(e.target.value)
    }
    let text = ''

    const handleFormSubmit = () => {
        // https://kakoyprazdnik.com
        axios.get(`${value}`).then(html => {
            const $ = cheerio.load(html.data)
            $('#bloktxt > h4').each((i, elem) => {
                text += `${$(elem).text()}\n`
            })
            console.log(text);
        })
    };

    return (
        <div>
                <input type="text" value={value} onChange={changeHandler}/>
                <button onClick={handleFormSubmit} type="submit">Parse</button>
            {text && <h1>{text}</h1>}
        </div>
    );
};

export default App;