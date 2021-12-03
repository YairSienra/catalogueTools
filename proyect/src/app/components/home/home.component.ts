import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { query } from '@angular/animations';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  listaDeProductos: ProductoI [] = [];

  producto: {
    nombre: string;
    stock: number;
    claves: string;
    precio: number;
  } = {
    nombre: '',
    stock: 0,
    claves: '',
    precio: 0,
  };

  recursoAuxiliar: string = '';

  recursoAuxiliar2: string = '';

  total: number = 0;

  productos: {
    id?: string,
    nombre: string;
    stock: number;
    claves: string[];
    precio: number;
  }[] = [];

  soyCliente: boolean = true;
  soyDueno: boolean = true;

  bandera: boolean = false;

  ProductoAbuscar: [] = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   this.listaAmostrar();
    this.soyDueno = false;
    //this.productorAborrar()
  }

  agregarProducto() {

    console.log(this.listaDeProductos[0].claves);
    this.guardarEnBaseDatos();

  }

  borrarProducto(posicionAsacar: number) {
    for (let index = 0; index < this.listaDeProductos.length; index++) {
      if (index === posicionAsacar) {
        this.http
          .delete(
            'http://localhost:4000/borrarProducto/' +
              this.listaDeProductos[index]._id
          )
          .subscribe((dato: any) => {
            if (dato) {
              this.listaDeProductos.splice(posicionAsacar, 1);
            }
          });
      }
    }

  }

  guardarEnBaseDatos() {


    let claves2: any = [];


    this.http
      .post('http://localhost:4000/productos', {
        nombre: this.producto.nombre,
        stock: this.producto.stock,
        claves: this.producto.claves.split(' '),
        precio: this.producto.precio,
      })
      .subscribe((dato: any) => {
        dato.numeroDescontar = 0;

        this.listaDeProductos.push(dato);
        console.log(this.listaDeProductos);
        (this.producto.nombre = ''),
          (this.producto.stock = 0),
          (this.producto.claves = '');
        this.producto.precio = 0;
      });
  }

  listaAmostrar() {
    this.http.get('http://localhost:4000/productos2').subscribe((dato: any) => {
      this.listaDeProductos = dato;


    });

  }




  modificarClaves() {

    for (let index = 0; index < this.listaDeProductos.length; index++) {

       this.http
      .put('http://localhost:4000/claves', {
        nombre: this.listaDeProductos[index].nombre,
        claves: this.listaDeProductos[index].claveAgregar,
      })
      .subscribe((dato: any) => {
        this.listaDeProductos[index] = dato
      });

    }
      this.mostrarCambio();


  }

  mostrarCambio() {
    for (let index = 0; index < this.productos.length; index++) {
      this.productos[index].claves.push(this.recursoAuxiliar2);
    }
  }



  borrarClaves(poscionDelProducto: number, poscionDelaClaveaBorrar: number) {
      this.listaDeProductos[poscionDelProducto].claves.splice(poscionDelaClaveaBorrar, 1)

for (let index = 0; index < this.listaDeProductos.length; index++) {

       this.http.put('http://localhost:4000/borradoClaves', {
   nombre: this.listaDeProductos[index].nombre, claves: this.listaDeProductos[index].claves})
   .subscribe((dato:any) => {})

      }

  }

  cliente() {
    if (this.soyCliente === false) {
      this.soyCliente = true;
    } else {
      this.soyDueno = false;
    }
  }

  dueno() {
    if (this.soyDueno === false) {
      this.soyDueno = true;
    }
  }

  tomarElementos(producto: ProductoI) {



    if (producto.stock) {
      if (producto.numeroDescontar <= producto.stock) {
        if (producto.numeroDescontar >= 0) {
          producto.stock = producto.stock - producto.numeroDescontar;
          this.total += producto.precio * producto.numeroDescontar;
        }
      }
    } else {
      alert('Out of stock');
    }

    /*  for (let index = 0; index < this.listaDeProductos.length; index++) {
      // console.log(this.listaDeProductos[index].stock)
      if (this.listaDeProductos[index].stock) {
        if (this.listaDeProductos[index].stock >= this.recursoAuxiliar3) {
          resultado =
            this.listaDeProductos[index].stock - this.recursoAuxiliar3;

          if (this.listaDeProductos[index].stock === 0) {
            console.log('Out Of Stock');
          }
          this.listaDeProductos[index].stock = resultado;

          if (this.recursoAuxiliar3 === 0) {
            this.total = 0;
          } else {
            this.total += this.listaDeProductos[index].precio;
          }
        }
      }
      if (this.bandera === false) {
        this.bandera = true;
      }
    } */
  }
}

interface ProductoI {
  _id?: string;
  nombre: string;
  stock: number;
  claves: string[];
  precio: number;
  numeroDescontar: number;
  claveAgregar: string
}
