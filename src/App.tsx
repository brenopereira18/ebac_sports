import { useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'

import { GlobalStyle } from './styles'
import { useGetProductsQuery } from './services/api'
import { store } from './store'
import { Provider } from 'react-redux'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const { data: produtos, isLoading, isError } = useGetProductsQuery()
  const [carrinho, setCarrinho] = useState<Produto[]>([])
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      setCarrinho([...carrinho, produto])
    }
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong...</div>
  if (!produtos) return <div>No products available</div>

  return (
    <Provider store={store}>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </Provider>
  )
}

export default App
