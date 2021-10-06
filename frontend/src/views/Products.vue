<template>
  <v-main>
    <h1 class="title-1 text-center my-5">Productos</h1>
    <section data-cy="products">
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="4"
          data-cy="product-item"
        >
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-img
              :src="product.image"
              lazy-src="https://via.placeholder.com/300"
              aspect-ratio="1"
              class="white--text align-end"
              height="200px"
            >
            </v-img>
            <v-card-title></v-card-title>
            <v-card-text><v-btn depressed color="error" @click="showDialog(product.id)" data-cy="btn-eliminar" >Eliminar</v-btn></v-card-text>
          </v-card>
        </v-col>
    </v-row>
    </section>
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>¿Estás seguro que quieres eliminar este producto?</v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false" data-cy="btn-cencelar">Cancelar</v-btn>
          <v-btn @click="deleteProduct" data-cy="btn-confirm">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      productId: 0
    }
  },
  computed: {
    ...mapState([
      'products'
    ])
  },
  methods: {
    ...mapActions([
      'getProducts',
      'removeProduct'
    ]),
    showDialog (id) {
      this.dialog = true
      this.productId = id
    },
    deleteProduct () {
      if (this.productId !== 0) {
        this.removeProduct(this.productId)
        this.productId = 0
        this.dialog = false
      }
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
