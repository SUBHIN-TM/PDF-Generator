const express =require('express')
const app=express()
app.use(express.json());
const path = require('path');
const puppeteer=require('puppeteer')
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
    console.log("req comes");
    return res.sendFile(path.join(__dirname, 'template.html'));
});

app.post('/generate-table',async (req,res) => {
    console.log("post");
const {data} =req.body
const browser =await puppeteer.launch({headless: 'new',})
const page= await browser.newPage()
await page.setViewport({
    width:1000,
    height:800
})
await page.setContent(`<html> <body> ${data}</body></html>`)
// await page.addStyleTag({
//     path:'pub'
// })
const pdfBuffer = await page.pdf({
    format:'A4',
    printBackground:true
})
await browser.close()

res.setHeader('Content-Type','application/pdf')
res.setHeader('Content-Disposition','attachment;filename=table.pdf')
res.send(pdfBuffer)
})


app.listen(5000,() => {
    console.log("server is listening in 6000");
})