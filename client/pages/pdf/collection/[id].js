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
        if(data.data[0]?.title == null) return
        if(data.data[0]?.title != null){
           console.log(data.data[0]?.title)
           pdfGenerate()
           Router.push("/admin/collection/lists")
        }
    },[data])

    const pdfGenerate = () => {
        let doc = new jsPDF({
            orientation: 'potrait',
            unit: 'px',
            format: 'a4'
        })
       // Header
       doc.rect(100, 50, 250, 10)
       doc.setFontSize(9)
       doc.text('Showcarpedia Collection Report (2022)', 110, 57.5)

       // Main Bar
       doc.rect(100, 60, 250, 500)

       doc.setFontSize(20)
       doc.text(`${data.data[0]?.title}`, 110, 85)

       // Fact Box
       doc.rect(110, 90, 230, 105)

       doc.setFontSize(10)
       // Brand
       doc.text(`Brand`, 120, 105)
       doc.text(`: ${data.data[0]?.brand}`, 180, 105)
       // Grade
       doc.text(`Grade`, 120, 120)
       doc.text(`: ${data.data[0]?.grade}`, 180, 120)
       // Category
       doc.text(`Category`, 120, 135)
       doc.text(`: ${data.data[0]?.category}`, 180, 135)
       // Year
       doc.text(`Year`, 120, 150)
       doc.text(`: ${data.data[0]?.year}`, 180, 150)
       // Kilometer
       doc.text(`Kilometer`, 120, 165)
       doc.text(`: ${data.data[0]?.kiloMeter} KM`, 180, 165)
       // Description
       doc.text(`Description`, 120, 180)
       doc.text(`: ${data.data[0]?.description} KM`, 180, 180)

       // Photo Box
       doc.rect(110, 235, 230, 300)
       doc.setFontSize(20)
       doc.text(`Photo Collection`, 110, 230)

       // Photos
       let photo = data.data[0]?.photoProducts

       let xcounter = 0;
       
       // for (let index = 0; index < array.length; index++) {
       //     const element = array[index];
           
       // }

       // if (photo.length <= 3) {
           photo?.map((e, i) => {
               let photoProduct = new Image()
               photoProduct.src = e
               photoProduct.alt = "alt"
               if (i <= 2) {
                   doc.addImage(photoProduct, "PNG", 120+xcounter, 245, 60, 60)
                   xcounter+=75;
               } else if (3 <= i <= 5) {
                   doc.addImage(photoProduct, "PNG", -505+xcounter, 315, 60, 60)
                   xcounter+=75;
               } 
               // else if (6 <= i <= 8) {
               //     doc.addImage(photoProduct, "PNG", -105+xcounter, 400, 60, 60)
               //     xcounter+=75;
               // } else if (9 <= i <= 11) {
               //     doc.addImage(photoProduct, "PNG", -105+xcounter, 500, 60, 60)
               //     xcounter+=75;
               // }
           })
       // }

       // Footer
       doc.rect(100, 550, 250, 10)
       doc.setFontSize(9)
       doc.text('Showcarpedia Collection Report (2022)', 222.5, 557.5)
        doc.save(`collection-${data.data[0]?.title}.pdf`)
    }
    return(
        <>
        </>
    )
} 