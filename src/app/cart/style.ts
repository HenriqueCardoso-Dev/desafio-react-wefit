import styled from "styled-components";

export const MainSection = styled.section`
    background-color: #ffffff;
    width: 100%;
    max-width: 960px;
    margin: 38px auto;
    border-radius: 4px;

    @media (max-width: 500px) {
        max-width: 95%;
        table{
            tr {
                td:first-child {
                    display: flex;
                    flex-direction: column;

                    img {
                        width: 64px;
                        height: 82px;
                    }

                    span {
                        margin: 0
                    }
                }
            }
        }

        .cart-footer {
            button {
                max-width: none;
            }
            flex-direction: column-reverse;
            align-items: end;
        }
    }
`