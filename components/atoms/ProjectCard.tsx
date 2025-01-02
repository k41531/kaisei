interface ProjectCardProps {
  href: string;
  alt: string;
  title: string;
  subtitle: string;
  imgSrc: string;
  imgAlt: string;
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <a href={props.href}>
      <div class="rounded-md aspect-square">
        <div class="grid grid-rows">
          <div class="row-span-2 p-2">
            <p>{props.title}</p>
            <p class="text-xs whitespace-nowrap hidden sm:block">{props.subtitle}</p>
          </div>
          <img
            class="row-span-2 h-16 mx-auto"
            src={props.imgSrc}
            alt={props.imgAlt}
          />
        </div>
      </div>
    </a>
  );
}
