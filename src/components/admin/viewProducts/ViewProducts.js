//// admin panelindeki allproducts componenti
import React, { useEffect } from 'react'
import {toast} from "react-toastify"
import {collection, deleteDoc, doc, onSnapshot, orderBy, query} from "firebase/firestore"
import { db, storage } from '../../../firebase/config'
import Loader from "../../loader/Loader"
import styles from "./ViewProducts.module.scss"
import { Link } from 'react-router-dom'
import {FaEdit,FaTrashAlt} from "react-icons/fa"
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import {useDispatch, useSelector} from "react-redux"
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'

const ViewProducts = () => {

  // const [products,setProducts] = React.useState([])
  // const [isLoading,setIsLoading] = React.useState([])

  const { data , isLoading } = useFetchCollection("products")

  const products = useSelector(selectProducts)

  const dispatch = useDispatch();

  // React.useEffect(()=>{
  //   getProducts()
  // },[])

  // const getProducts = () => {
  //   setIsLoading(true)
  //   try{
  //     //belirli bir koleksiyonu almak için
  //     const productsRef = collection(db, "products")
  //     //seçtiğimiz koleksiyonu sırala
  //     const q = query(productsRef, orderBy("createdAt","desc"))
  //     //gerçek zamanlı dinleme
  //     onSnapshot(q,(snapshot)=>{
  //       // console.log(snapshot)
  //       // console.log(snapshot.docs[0].data())
  //       const allProducts = snapshot.docs.map((doc)=> {
  //         return ({
  //         id:doc.id,
  //         ...doc.data()
  //       })})
  //       // console.log(allProducts)
  //       setIsLoading(false)
  //       setProducts(allProducts)
  //       dispatch(STORE_PRODUCTS({products:allProducts}
  //       ))
  //     })
  //   }
  //   catch(error){
  //     setIsLoading(false)
  //     toast.error(error.message)
  //   }
  // }

  useEffect(()=>{
    dispatch(STORE_PRODUCTS({
      products: data
    }))
  },[dispatch,data])

  const confirmDelete = (id,imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete this product?',
      'Delete',
      'Cancel',
      function okCb(){
        deleteProduct(id,imageURL)
      },
      function cancelCb(){

      },
      {
        width:"320px",
        borderRadius:"3px",
        titleColor:"orangered",
        okButtonBackground:"orangered",
        cssAnimationStyle: "zoom"
      }
    )
  }

  const deleteProduct = async(id,imageURL) => {
    try {
      await deleteDoc(doc(db,"products",id))

      const storageRef = ref(storage,imageURL)
      await deleteObject(storageRef)
      
      toast.success("Product deleted successfully")
    }
    catch(error){
      toast.error(error.message)
    }
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.table}>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No product found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product,index)=>{
              const {id,name,price,imageURL,category} = product
              return (
                <tr key={id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <img src={imageURL} alt={name} style={{width:"100px"}}/>
                  </td>
                  <td>
                    {name}
                  </td>
                  <td>
                    {category}
                  </td>
                  <td>
                    {`$${price}`}
                  </td>
                  <td>
                    <Link to={`/admin/add-product/${id}`}>
                      <FaEdit size={20} color="green"/>
                    </Link>&nbsp;
                    <FaTrashAlt size={18} color="red" onClick={()=>confirmDelete(id,imageURL)}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
    </>
  )
}

export default ViewProducts