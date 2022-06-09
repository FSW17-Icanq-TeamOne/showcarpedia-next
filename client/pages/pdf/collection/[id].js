import {Button} from "@mui/material"
import jsPDF from "jspdf"
import { useRouter } from "next/router";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { fetchCollectionDataById } from "../../../redux/slices/collectionsSlice";
import Router from "next/router"

export default function CollectionPDF() {

    const router = useRouter()
    const dispatch = useDispatch()
    const { id } = router.query

    const data = useSelector(state => state.collections)

    const loadData = async () => {
        await dispatch(fetchCollectionDataById(id))
    }

    useEffect(() => {
        if(!router.isReady) return
        loadData()
    },[router.isReady])

    useEffect(() => {
        if(data.data?.title == null) return
        if (data.data?.title != null){
        pdfGenerate()
        Router.push("/admin/collection/lists")
        }
    },[data])

    const getBase64Image = (url) => {
        const img = new Image();
        img.setAttribute('crossOrigin', '');
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          console.log(dataURL)
        }
        img.src = url
      }

    const pdfGenerate = () => {
        let doc = new jsPDF('portrait', 'px', 'a4', 'false')
        // let urlFoto = "https://i.stack.imgur.com/EoOaz.png"
        // let fotoUrl = getBase64Image(urlFoto)
        // console.log("ini url", fotoUrl)
        let photo = data.data?.photoProducts

        let counter = 0
        photo?.map((e, i) => {
            let photoProduct = new Image()
            photoProduct.src = e
            photoProduct.alt = "alt"
            doc.addImage(photoProduct, "PNG", 65, 20+counter, 150, 150)
            counter=counter+200
        })
        doc.addPage()
        doc.text(60, 60, "Title")
        doc.text(60, 80, "Brand")
        doc.text(60, 100, "Grade")
        doc.text(60, 120, "Category")
        doc.text(60, 140, "Year")
        doc.text(60, 160, "Kilo Meter")
        doc.text(60, 180, "Description")
        doc.text(140, 60, `: ${data.data?.title}`)
        doc.text(140, 80, `: ${data.data?.brand}`)
        doc.text(140, 100, `: ${data.data?.grade}`)
        doc.text(140, 120, `: ${data.data?.category}`)
        doc.text(140, 140, `: ${data.data?.year}`)
        doc.text(140, 160, `: ${data.data?.kiloMeter}`)
        doc.text(140, 180, `: ${data.data?.description}`)
        doc.save('collection.pdf')
    }
    return(
        <>
        </>
    )
}