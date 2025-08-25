import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../theme/Colors'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CWidgetStatsC,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions, cilBasket } from '@coreui/icons'

const WidgetsProducts = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
        <CRow className={props.className} xs={{ gutter: 4 }}>
          <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsC
      className="mb-3"
      style={{ backgroundColor: colors.halloween, color: 'white' }}
      icon={<CIcon icon={cilBasket} height={36} />}
      value="356"
      progress={{ color: 'white', value: 75 }}
      title="Todos os Produtos"
    />

      </CCol>
       <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsC
          className="mb-3"
          style={{ backgroundColor: colors.pretoAssombroso, color: 'white' }}
          icon={<CIcon icon={cilBasket} height={36} />}
          value="356"
           progress={{ color: 'white', value: 75 }}
          title="Sem Estoque"
        />
      </CCol>
       <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsC
          className="mb-3"
          style={{ backgroundColor: colors.cinzaDavys, color: 'white' }}
          icon={<CIcon icon={cilBasket} height={36} />}
          value="356"
           progress={{ color: 'white', value: 75 }}
          title="Estoque em Movimento"
        />
      </CCol>
       <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsC
          className="mb-3"
           style={{ backgroundColor: colors.abobora, color: 'white' }}
          icon={<CIcon icon={cilBasket} height={36} />}
          value="356"
           progress={{ color: 'white', value: 75 }}
          title="Em Estoque"
        />
      </CCol>
    </CRow>
  )
}

WidgetsProducts.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsProducts
