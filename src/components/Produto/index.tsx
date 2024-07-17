import { useDispatch, useSelector } from 'react-redux'
import { Produto, Produto as ProdutoType } from '../../App'
import * as S from './styles'
import { addCart, addFavorit, removeFavorit } from '../../store/reducers/cart'
import { RootReducer } from '../../store'

type Props = {
  produto: ProdutoType
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useDispatch()
  const isFavorit = useSelector((state: RootReducer) =>
    state.cart.itemsFavorits.some((fav) => fav.id === produto.id)
  )

  const addToCart = (produto: Produto) => {
    dispatch(addCart(produto))
  }

  const manipulateFavorites = (produto: Produto) => {
    if (isFavorit) {
      dispatch(removeFavorit(produto))
    } else {
      dispatch(addFavorit(produto))
    }
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={() => manipulateFavorites(produto)} type="button">
        {isFavorit ? '- Remover dos favoritos' : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={() => addToCart(produto)} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
