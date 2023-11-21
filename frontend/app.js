new Vue({
  el: '#app',
  data: {
    products: [],
    cart: [],
    customerName: '',
    customerEmail: '',
    showCart: false,
    showOrderForm: false,
    baseUrl: 'http://localhost:3000', // Adiciona a URL base
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetch(`${this.baseUrl}/products`) // Usa a URL base
        .then(response => response.json())
        .then(data => this.products = data)
        .catch(error => {
          console.error('Erro ao buscar produtos', error);
          // Trate o erro de forma mais robusta, se necessário
        });
    },
    addToCart(productId) {
      const product = this.products.find(product => product._id === productId);
      if (product) {
        this.cart.push(product);
      }
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    placeOrder() {
      // Adiciona validação básica antes de fazer o pedido
      if (this.cart.length === 0 || !this.customerName || !this.customerEmail) {
        console.error('Por favor, preencha o carrinho e as informações do cliente.');
        // Exiba uma mensagem para o usuário ou tome outra ação apropriada
        return;
      }

      const orderData = {
        products: this.cart.map(product => product._id),
        customerName: this.customerName,
        customerEmail: this.customerEmail,
      };

      fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Pedido criado com sucesso:', data);
        this.cart = [];
        this.customerName = '';
        this.customerEmail = '';
        this.showOrderForm = false;
      })
      .catch(error => {
        console.error('Erro ao criar pedido', error);
        // Trate o erro de forma mais robusta, se necessário
      });
    },
  },
});