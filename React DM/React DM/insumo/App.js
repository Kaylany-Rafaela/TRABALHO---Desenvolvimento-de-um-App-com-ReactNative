// App.js
// Expo / React Native - App completo com layout fiel aos protótipos (apenas UI, sem BD / sem autenticação)

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

/* ------------------ Imagens (coloque em ./assets com esses nomes) ------------------ */
const IMG = {
  login: require('./assets/login.png'),
  telaInicial: require('./assets/tela_inicial.png'),

};

/* ------------------ Mock (exemplo) ------------------ */
const MOCK_INSUMOS = [
  { id: '1', nome: 'Parafuso', categoria: 'Ferramentas', quantidade: 140, unidade: 'Caixa', fornecedor: 'Tigre' },
  { id: '2', nome: 'Porca', categoria: 'Ferramentas', quantidade: 300, unidade: 'Pacote', fornecedor: 'ABC' },
];

/* ------------------ Screens ------------------ */

// Card container usado em várias telas (estética protótipo)
function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/* LOGIN */
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={styles.centeredScroll}>
        <Image source={IMG.login} style={styles.banner} resizeMode="contain" />

        <Card style={styles.cardLogin}>
          <Text style={styles.label}>Login</Text>
          <TextInput placeholder="Email" placeholderTextColor="#777" style={styles.input} value={email} onChangeText={setEmail} />

          <Text style={[styles.label, { marginTop: 8 }]}>Senha</Text>
          <TextInput placeholder="Senha" placeholderTextColor="#777" secureTextEntry style={styles.input} value={senha} onChangeText={setSenha} />

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgot}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.replace('Dashboard')}>
            <Text style={styles.primaryBtnText}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: '#2fa79f' }]} onPress={() => navigation.navigate('CadastroUsuario')}>
            <Text style={styles.primaryBtnText}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

/* CADASTRO USUÁRIO */
function CadastroUsuarioScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={styles.centeredScroll}>
        <Image source={IMG.cadastroUsuario} style={styles.bannerSmall} resizeMode="contain" />

        <Card style={styles.cardLogin}>
          <Text style={styles.titleCard}>Cadastro de Usuário</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput placeholder="Nome" placeholderTextColor="#777" style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>E-mail</Text>
          <TextInput placeholder="E-mail" placeholderTextColor="#777" style={styles.input} value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Senha</Text>
          <TextInput placeholder="Senha" placeholderTextColor="#777" secureTextEntry style={styles.input} value={senha} onChangeText={setSenha} />

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.replace('Dashboard')}>
            <Text style={styles.primaryBtnText}>CADASTRE-SE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkSecondary}>Voltar ao login</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

/* DASHBOARD (Tela Inicial) */
function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Image source={IMG.telaInicial} style={styles.bannerWide} resizeMode="contain" />

        <Text style={styles.headerCenter}>Controle de Insumos</Text>

        <View style={{ marginTop: 8 }}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total de Insumos</Text>
            <View style={styles.summaryInner}><Text style={styles.summaryNumber}>Nro de Insumos</Text></View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Entradas Recentes</Text>
            <View style={styles.summaryInner}><Text style={styles.summaryNumber}>Nro de Entradas</Text></View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Saídas Recentes</Text>
            <View style={styles.summaryInner}><Text style={styles.summaryNumber}>Nro de Saídas</Text></View>
          </View>
        </View>

        <View style={styles.rowActions}>
          <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate('ListaInsumos')}>
            <Text style={styles.ghostBtnText}>Lista de Insumos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate('RegistrarEntrada')}>
            <Text style={styles.ghostBtnText}>Registrar Entrada</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate('RegistrarSaida')}>
            <Text style={styles.ghostBtnText}>Registrar Saída</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* LISTA DE INSUMOS */
function ListaInsumosScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [insumos] = useState(MOCK_INSUMOS);

  function renderItem({ item }) {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listTitle}>{item.nome}</Text>
          <Text style={styles.listSub}>{item.categoria} • {item.quantidade} {item.unidade}</Text>
        </View>

        <View style={{ width: 90, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesInsumo', { insumo: item })}>
            <Text style={styles.linkSecondary}>[Detalhes]</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={{ padding: 14 }}>
        <Image source={IMG.lista} style={styles.bannerSmall} resizeMode="contain" />

        <Card style={{ padding: 12 }}>
          <Text style={styles.titleCard}>Lista de Insumos</Text>

          <TextInput placeholder="Buscar por Insumo/Filtrar" placeholderTextColor="#555" style={styles.input} value={query} onChangeText={setQuery} />

          <FlatList data={insumos} keyExtractor={(i) => i.id} renderItem={renderItem} style={{ marginTop: 8 }} />

          <TouchableOpacity style={[styles.primaryBtn, { marginTop: 12 }]} onPress={() => navigation.navigate('CadastroInsumo')}>
            <Text style={styles.primaryBtnText}>Adicionar Novo Insumo</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

/* CADASTRO DE INSUMO */
function CadastroInsumoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [unidade, setUnidade] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [obs, setObs] = useState('');

  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={{ padding: 14 }}>
        <Image source={IMG.cadastroInsumo} style={styles.bannerSmall} resizeMode="contain" />

        <Card>
          <Text style={styles.titleCard}>Cadastrar Novo Insumo</Text>

          <Text style={styles.label}>Nome do Insumo:</Text>
          <TextInput style={styles.input} placeholder="Nome do insumo" placeholderTextColor="#777" value={nome} onChangeText={setNome} />

          <Text style={styles.label}>Categoria:</Text>
          <TextInput style={styles.input} placeholder="Categoria" placeholderTextColor="#777" value={categoria} onChangeText={setCategoria} />

          <Text style={styles.label}>Unidade de Medida:</Text>
          <TextInput style={styles.input} placeholder="kg / L / Nro" placeholderTextColor="#777" value={unidade} onChangeText={setUnidade} />

          <Text style={styles.label}>Quantidade:</Text>
          <TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" placeholderTextColor="#777" value={quantidade} onChangeText={setQuantidade} />

          <Text style={styles.label}>Fornecedor:</Text>
          <TextInput style={styles.input} placeholder="Fornecedor" placeholderTextColor="#777" value={fornecedor} onChangeText={setFornecedor} />

          <Text style={styles.label}>Observações:</Text>
          <TextInput style={[styles.input, { height: 100 }]} placeholder="Observações" placeholderTextColor="#777" multiline value={obs} onChangeText={setObs} />

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Salvar Insumo</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

/* DETALHES DO INSUMO */
function DetalhesInsumoScreen({ navigation, route }) {
  const insumo = route?.params?.insumo || MOCK_INSUMOS[0];

  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={{ padding: 14 }}>
        <Image source={IMG.detalhes} style={styles.bannerSmall} resizeMode="contain" />

        <Card>
          <Text style={styles.titleCard}>Detalhes do Insumo</Text>

          <Text style={styles.infoLine}><Text style={{ fontWeight: '700' }}>Nome do Insumo: </Text>{insumo.nome}</Text>
          <Text style={styles.infoLine}><Text style={{ fontWeight: '700' }}>Categoria: </Text>{insumo.categoria}</Text>
          <Text style={styles.infoLine}><Text style={{ fontWeight: '700' }}>Unidade: </Text>{insumo.unidade}</Text>
          <Text style={styles.infoLine}><Text style={{ fontWeight: '700' }}>Qtde: </Text>{insumo.quantidade}</Text>
          <Text style={styles.infoLine}><Text style={{ fontWeight: '700' }}>Fornecedor: </Text>{insumo.fornecedor}</Text>

          <Text style={[styles.subheader, { marginTop: 12 }]}>Histórico</Text>
          <View style={styles.tableHeader}>
            <Text style={{ flex: 1, color: '#ddd', fontWeight: '700' }}>Tipo</Text>
            <Text style={{ flex: 1, color: '#ddd', fontWeight: '700' }}>Qtde</Text>
            <Text style={{ flex: 1, color: '#ddd', fontWeight: '700' }}>Data</Text>
          </View>
          {/* mock rows */}
          <View style={styles.tableRow}><Text style={{ flex: 1 }}>Entrada</Text><Text style={{ flex: 1 }}>100</Text><Text style={{ flex: 1 }}>01/09/2025</Text></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }}>
            <TouchableOpacity style={styles.primaryBtnSmall} onPress={() => navigation.navigate('RegistrarEntrada', { insumo })}>
              <Text style={styles.primaryBtnText}>Registrar Entrada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtnSmall} onPress={() => navigation.navigate('RegistrarSaida', { insumo })}>
              <Text style={styles.primaryBtnText}>Registrar Saída</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

/* REGISTRAR ENTRADA */
function RegistrarEntradaScreen({ navigation, route }) {
  const insumo = route?.params?.insumo;
  const [nome, setNome] = useState(insumo?.nome || '');
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState('');
  const [obs, setObs] = useState('');

  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={{ padding: 14 }}>
        <Image source={IMG.entrada} style={styles.bannerSmall} resizeMode="contain" />

        <Card>
          <Text style={styles.titleCard}>Registrar Entrada</Text>

          <Text style={styles.label}>Nome do Insumo:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>Quantidade:</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={quantidade} onChangeText={setQuantidade} />

          <Text style={styles.label}>Data:</Text>
          <TextInput style={styles.input} value={data} onChangeText={setData} placeholder="dd/mm/aaaa" />

          <Text style={styles.label}>Observações:</Text>
          <TextInput style={[styles.input, { height: 100 }]} multiline value={obs} onChangeText={setObs} />

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Registrar Entrada</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

/* REGISTRAR SAÍDA */
function RegistrarSaidaScreen({ navigation, route }) {
  const insumo = route?.params?.insumo;
  const [nome, setNome] = useState(insumo?.nome || '');
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState('');
  const [obs, setObs] = useState('');

  return (
    <SafeAreaView style={styles.screenDark}>
      <ScrollView contentContainerStyle={{ padding: 14 }}>
        <Image source={IMG.saida} style={styles.bannerSmall} resizeMode="contain" />

        <Card>
          <Text style={styles.titleCard}>Registrar Saída</Text>

          <Text style={styles.label}>Nome do Insumo:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>Quantidade:</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={quantidade} onChangeText={setQuantidade} />

          <Text style={styles.label}>Data:</Text>
          <TextInput style={styles.input} value={data} onChangeText={setData} placeholder="dd/mm/aaaa" />

          <Text style={styles.label}>Observações:</Text>
          <TextInput style={[styles.input, { height: 100 }]} multiline value={obs} onChangeText={setObs} />

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Registrar Saída</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ------------------ App Navigator ------------------ */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000' }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuarioScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ListaInsumos" component={ListaInsumosScreen} options={{ title: 'Lista de Insumos' }} />
        <Stack.Screen name="CadastroInsumo" component={CadastroInsumoScreen} options={{ title: 'Cadastrar Insumo' }} />
        <Stack.Screen name="DetalhesInsumo" component={DetalhesInsumoScreen} options={{ title: 'Detalhes do Insumo' }} />
        <Stack.Screen name="RegistrarEntrada" component={RegistrarEntradaScreen} options={{ title: 'Registrar Entrada' }} />
        <Stack.Screen name="RegistrarSaida" component={RegistrarSaidaScreen} options={{ title: 'Registrar Saída' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
  screenDark: {
    flex: 1,
    backgroundColor: '#21343a', // tom escuro parecido com protótipo
  },
  centeredScroll: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  banner: { width: 300, height: 110, marginBottom: 18 },
  bannerSmall: { width: '80%', height: 80, marginBottom: 12, alignSelf: 'center' },
  bannerWide: { width: '90%', height: 120, marginBottom: 6, alignSelf: 'center' },

  card: {
    backgroundColor: '#9b9b9b', // cinza do protótipo
    width: '92%',
    borderRadius: 16,
    padding: 14,
    // sombra leve (android)
    elevation: 4,
    // iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardLogin: {
    width: '86%',
    padding: 20,
  },

  titleCard: {
    fontSize: 18,
    fontWeight: '700',
    color: '#05333a',
    marginBottom: 8,
    textAlign: 'left',
  },

  label: {
    color: '#fff',
    marginBottom: 6,
    fontSize: 14,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 6,
  },

  forgot: {
    color: '#e6f6f4',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 8,
    textDecorationLine: 'underline',
  },

  primaryBtn: {
    backgroundColor: '#25a89b', // turquesa
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryBtnSmall: {
    backgroundColor: '#25a89b',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  linkSecondary: {
    color: '#2a9d8f',
    marginTop: 8,
    textAlign: 'center',
  },

  headerCenter: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  summaryCard: {
    backgroundColor: '#2d6b68',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  summaryLabel: { color: '#bcd', marginBottom: 6 },
  summaryInner: {
    backgroundColor: '#dfecec',
    borderRadius: 12,
    marginTop: 6,
    padding: 14,
    alignItems: 'center',
  },
  summaryNumber: { color: '#444', fontWeight: '700' },

  rowActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  ghostBtn: {
    backgroundColor: '#e9f2f1',
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  ghostBtnText: {
    color: '#0b3b3a',
    fontWeight: '700',
  },

  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  listTitle: { color: '#0b3b3a', fontWeight: '700', fontSize: 15 },
  listSub: { color: '#2d524f', fontSize: 12 },

  subheader: { color: '#fff', fontSize: 16, fontWeight: '700' },

  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 0.3, borderBottomColor: '#444' },
});

