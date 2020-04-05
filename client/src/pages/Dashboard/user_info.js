import states from '../../assets/states.json'

export const getState = (
  stateID,
  searchFor = 'id',
  format = 'abbr') => states.filter(state => state[searchFor] == stateID)[0][format]

function formatPhone(num){
    num=num.replace(/\D/g,"");             
    num=num.replace(/^(\d{2})(\d)/g,"($1) $2"); 
    num=num.replace(/(\d)(\d{4})$/,"$1-$2");
    return num;
}



export const getInfo = (user, type) => {
  return type === 'professional' ? 
  [
    {
      title: 'Identificação',
      values: [
        {
          campo: 'Gênero',
          valor: user.gender
        },
        {
          campo: 'Auto declaração',
          valor: user.self_declaration
        },
        {
          campo: 'Data de nascimento',
          valor: user.birthday
        }
      ]
    },
    {
      title: 'Localização',
      values: [
        {
          campo: 'Endereço',
          valor: user.address
        },
        {
          campo: 'Cidade',
          valor: user.city
        },
        {
          campo: 'Estado',
          valor: getState(user.state)
        }
      ]
    },
    {
      title: 'Contato',
      values: [
        {
          campo: 'Telefone',
          valor: formatPhone(user.phone)
        },
        {
          campo: 'E-mail',
          valor: user.user_email
        },
        {
          campo: 'Links',
          valor: user.links.split(';').join(', ')
        }
      ]
    },
    {
      title: 'Formação',
      values: [
        {
          campo: 'Tipo de Formação',
          valor: user.education
        },
        {
          campo: 'Instituição',
          valor: user.formation_institution
        },
        {
          campo: 'Áreas de atuação',
          valor: (user.expertise_areas && user.expertise_areas.length > 0) &&
            user.expertise_areas.join(', ') || 'Nenhum'
        }
      ]
    },
  ] :
  [
    {
      title: 'Localização',
      values: [
        {
          campo: 'Cidade',
          valor: user.city
        },
        {
          campo: 'Estado',
          valor: getState(user.state)
        },
        {
          campo: 'Data de fundação',
          valor: user.foundation_date
        },
        {
          campo: 'Outros Estados',
          valor: (user.other_states && user.other_states.join(', ')) || 'Nenhum'
          // .map(uf => getState(uf, 'name')).join(', ')
        }
      ]
    },
    {
      title: 'Contato',
      values: [
        {
          campo: 'Nome do Responsável',
          valor: user.name
        },
        {
          campo: 'Telefone',
          valor: formatPhone(user.phone)
        },
        {
          campo: 'E-mail',
          valor: user.user_email
        },
        {
          campo: 'Links',
          valor: user.links && user.links.join(', ')
        }
      ]
    },
    {
      title: 'Especialização',
      values: [
        {
          campo: 'Campos de atuação',
          valor: (user.business_fields && user.business_fields.join(', ')) || 'Nenhum'
          // .join(', ')
        },
        {
          campo: 'Segmentos de conteúdo identitário',
          valor: (user.identity_segments && user.identity_segments.join(', ')) || 'Nenhum'
          // .join(', ')
        },
        {
          campo: 'Funções que busca diversificar na empresa',
          valor: (user.identity_segments && user.diversity_functions.join(', ')) || 'Nenhum'
          // .join(', ')
        }
      ]
    },
    {
      title: 'Identificação',
      values: [
        {
          campo: 'Tipo de CNPJ',
          valor: user.cnpj_type
        },
        {
          campo: 'Responsável',
          valor: user.name
        },
        {
          campo: 'Gênero',
          valor: user.gender
        },
        {
          campo: 'Auto declaração',
          valor: user.self_declaration
        },
      ]
    },
  ]
}