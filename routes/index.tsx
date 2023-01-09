import { Head } from "$fresh/runtime.ts";

export default function Home() {
return (
  <>
    <Head>
      <title>Kaisei</title>
    </Head>
    <header>
      ~
      <hr/>
    </header>
    <main>
      <section>
        <h2>
          About me
        </h2>
        <table>
          <tbody>
            <tr>
               <td>Name</td> 
               <td>Kaisei</td>
            </tr>
            <tr>
               <td>Email</td> 
               <td>me@kaisei.dev</td>
            </tr>
            <tr>
               <td>GitHub</td> 
               <td><a href="https://github.com/k41531">github.com/k41531</a></td>
            </tr>
            <tr>
               <td>Twitter</td> 
               <td><a href="https://twitter.com/k41531">twitter.com/k41531</a></td>
            </tr>
            <tr>
               <td>Blog</td> 
               <td><a href="https://zenn.dev/k41531">zenn.dev/k41531</a></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        
      </section>
    </main>
  </>
);
}
